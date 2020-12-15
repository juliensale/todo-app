from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, \
                                        PermissionsMixin

from django.db import models
from django.conf import settings


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        """Crée et sauvegarde le nouveau user"""
        if not username:
            raise ValueError('Users must have a username')
        if not email:
            raise ValueError('Users must have an email')
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        """Crée et sauvegarde le nouveau superuser"""
        user = self.create_user(username, email, password, **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=254, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class List(models.Model):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    color = models.CharField(max_length=10)

    def __str__(self):
        return self.title

class SubList(models.Model):
    list = models.ForeignKey("List", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    def save(self, *args, **kwargs):
        self.user = self.list.user
        super(SubList, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

