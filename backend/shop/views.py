from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Categories, Products
from .serializers import CategorySerializer, ProductSerializer, TokenObtainPairSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView


# Category ViewSet
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer


# Product ViewSet
class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer

    def get_queryset(self):
        """
        Optionally filter products by category.
        """
        queryset = Products.objects.all()  # Start with all products
        category_id = self.request.query_params.get('category', None)  # Get category id from query params

        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)  # Filter products by category_id

        return queryset


# login
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Register View
@api_view(['POST'])
def register(request):
    # Create a new user
    user = User.objects.create_user(
        username=request.data['username'],
        password=request.data['password']
    )
    user.is_active = True
    user.save()

    # Generate a refresh token and access token
    refresh = RefreshToken.for_user(user)

    # Include the username in the refresh token
    refresh['username'] = user.username  # Add the username to the refresh token

    # Include the username in the response
    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'username': user.username  # Include the username in the response
    })
