import { CommandInt } from '../interfaces/CommandInt';
import { add } from './add';
import { delet } from './delete';
import { view } from './view';
import { help } from './help';

export const CommandList: CommandInt[] = [add, delet, view, help];