import { Route, Routes } from 'react-router-dom';
import { GuestRoute } from '@/components/auth/GuestRoute';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import { CreateRoomPage } from '@/pages/CreateRoomPage';
import { HomePage } from '@/pages/HomePage';
import { JoinRoomPage } from '@/pages/JoinRoomPage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ProblemDetailsPage } from '@/pages/ProblemDetailsPage';
import { ProblemListPage } from '@/pages/ProblemListPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { WaitingRoomPage } from '@/pages/WaitingRoomPage';
import { BattlePage } from '@/pages/BattlePage';
import { BattleCodingPage } from '@/pages/BattleCodingPage';
import { BattleResultsPage } from '@/pages/BattleResultsPage';
import { CodingEditorPage } from '@/pages/CodingEditorPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route element={<GuestRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="editor" element={<CodingEditorPage />} />
          <Route path="problems" element={<ProblemListPage />} />
          <Route path="problems/:problemId" element={<ProblemDetailsPage />} />
          <Route path="rooms/create" element={<CreateRoomPage />} />
          <Route path="rooms/join" element={<JoinRoomPage />} />
          <Route path="rooms/:roomId" element={<WaitingRoomPage />} />
          <Route path="rooms/:roomId/configure" element={<BattlePage />} />
          <Route path="rooms/:roomId/select-problem" element={<BattlePage />} />
          <Route path="rooms/:roomId/battle" element={<BattleCodingPage />} />
          <Route path="rooms/:roomId/results" element={<BattleResultsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
