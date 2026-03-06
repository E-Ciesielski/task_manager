from enum import Enum

class TaskStatus(str, Enum):
    IDEAS = "ideas"
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    DONE = "done"

class TaskType(str, Enum):
    BUG = "bug"
    FEATURE = "feature"
    DOC = "doc"
    REFACTOR = "refactor"