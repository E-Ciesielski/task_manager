from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, default='')
    archived = models.BooleanField(default=False, db_index=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class Task(models.Model):
    class Priority(models.IntegerChoices):
        LOW = 0, "Low"
        MEDIUM = 1, "Medium"
        HIGH = 2, "High"

    class TaskType(models.TextChoices):
        FEATURE = "FEATURE", "Feature"
        BUG = "BUG", "Bug fix"
        REFACTOR = "REFACTOR", "Refactor"
        DOC = "DOC", "Documentation"
    
    class Status(models.TextChoices):
        TODO = "TODO", "To Do"
        IN_PROGRESS = "IN_PROGRESS", "In Progress"
        DONE = "DONE", "Done"

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    name = models.CharField(max_length=100, db_index=True)
    description = models.TextField(blank=True, default='')
    priority = models.IntegerField(choices=Priority.choices)
    type = models.CharField(choices=TaskType.choices, max_length=8)
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.TODO, db_index=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created']
        constraints = [
            models.UniqueConstraint(
                fields=['project', 'name'],
                name='unique_task_name_per_project'
            )
        ]
        indexes = [
            models.Index(fields=['project', 'status'])
        ]

    def __str__(self):
        return self.name

    

