from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, register
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import MyTokenObtainPairView  # Import your custom TokenObtainPairView

# Initialize the router
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')

# Include the router URLs in the app's URL configuration without the /api/ prefix
urlpatterns = [
    path('', include(router.urls)),  # Register routes directly at the root level
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Use your custom view here
    path('register/', register, name='register'),
]
