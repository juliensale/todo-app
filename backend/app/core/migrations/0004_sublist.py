# Generated by Django 3.1.4 on 2020-12-15 16:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_list'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.list')),
            ],
        ),
    ]
