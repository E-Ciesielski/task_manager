<?php

namespace App\Enum;

enum TaskType: string
{
    case IDEA = 'IDEA';
    case TODO = 'TODO';
    case IN_PROGRESS = 'IN_PROGRESS';
    case DONE = 'DONE';
}
