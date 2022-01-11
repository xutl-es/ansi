import wrap from './wrap';
import { Stream } from './stream';

export { Colors } from './ansi';

const deflt = Object.assign(Object.assign({}, wrap), { Stream });
export default deflt;
