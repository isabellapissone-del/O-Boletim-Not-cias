import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ArticleDetail } from './pages/ArticleDetail';
import { CategoryPage } from './pages/CategoryPage';
import { AuthorPage } from './pages/AuthorPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminEditor } from './pages/AdminEditor';
import { Login } from './pages/Login';
import { Search } from './pages/Search';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfUse } from './pages/TermsOfUse';
import { EditorialPolicy } from './pages/EditorialPolicy';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="noticia/:slug" element={<ArticleDetail />} />
          <Route path="categoria/:slug" element={<CategoryPage />} />
          <Route path="autor/:slug" element={<AuthorPage />} />
          <Route path="pesquisa" element={<Search />} />
          
          {/* Static Pages */}
          <Route path="sobre" element={<AboutPage />} />
          <Route path="contactos" element={<ContactPage />} />
          <Route path="privacidade" element={<PrivacyPolicy />} />
          <Route path="termos" element={<TermsOfUse />} />
          <Route path="politica-editorial" element={<EditorialPolicy />} />
          
          {/* Admin Routes */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/editor" element={<AdminEditor />} />
          <Route path="admin/editor/:id" element={<AdminEditor />} />
          <Route path="login" element={<Login />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
