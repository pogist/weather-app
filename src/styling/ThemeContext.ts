import { createContext } from 'react';

import light from './themes/light';
import type { Theme } from './types';

const ThemeContext = createContext<Theme>(light);
export default ThemeContext;
