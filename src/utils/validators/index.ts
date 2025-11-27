import {validateAuth} from './auth.validator'
import {validateProject} from './project.validator'
import {validateTag} from './tag.validator'
import {validateTask} from './task.validator'

export const validators = {
    ...validateAuth,
    ...validateProject,
    ...validateTag,
    ...validateTask
}