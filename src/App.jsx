import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AptitudeJourney from './pages/Aptitude/AptitudeJourney';
import TopicPage from './pages/Aptitude/TopicPage';
import LessonPage from './pages/Aptitude/LessonPage';
import PracticePage from './pages/Aptitude/PracticePage';
import TestPage from './pages/Aptitude/TestPage';
import CommunicationPage from './pages/Communication/CommunicationPage';
import SpeakingPage from './pages/Communication/SpeakingPage';
import CommunicationLessonsPage from './pages/Communication/CommunicationLessonsPage';
import CommunicationLearnPage from './pages/Communication/CommunicationLearnPage';
import ProgressPage from './pages/Progress/ProgressPage';
import HistoryPage from './pages/History/HistoryPage';
import AdminPage from './pages/AdminPage';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return user?.role === 'admin' ? <>{children}</> : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/aptitude" element={<AptitudeJourney />} />
        <Route path="/aptitude/topic/:topicId" element={<TopicPage />} />
        <Route path="/aptitude/topic/:topicId/lesson/:subTopicId" element={<LessonPage />} />
        <Route path="/aptitude/topic/:topicId/practice" element={<PracticePage />} />
        <Route path="/aptitude/topic/:topicId/test" element={<TestPage />} />
        <Route path="/communication" element={<CommunicationPage />} />
        <Route path="/communication/practice" element={<SpeakingPage />} />
        <Route path="/communication/learn" element={<CommunicationLessonsPage />} />
        <Route path="/communication/learn/:lessonId" element={<CommunicationLearnPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;