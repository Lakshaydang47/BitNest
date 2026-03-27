/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter } from 'react-router-dom';
import ProjectRoutes from './ProjectRoutes';
import { AuthProvider } from './authContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ProjectRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
