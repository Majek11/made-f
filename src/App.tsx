import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import BoardOfTrustees from "./pages/BoardOfTrustees";
import TrusteeProfile from "./pages/TrusteeProfile";
import AdvisoryBoards from "./pages/AdvisoryBoards";
import AdvisorProfile from "./pages/AdvisorProfile";
import Mission from "./pages/Mission";
import Values from "./pages/Values";
import Impact from "./pages/Impact";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CommunityJournalismFellowship from "./pages/programmes/CommunityJournalismFellowship";
import DialoguePolicySeries from "./pages/programmes/DialoguePolicySeries";
import GenderSocialInclusion from "./pages/programmes/GenderSocialInclusion";
import JAC from "./pages/programmes/JAC";
import YouthDigitalLeadership from "./pages/programmes/YouthDigitalLeadership";
import Conference from "./pages/programmes/Conference";
import Programmes from "./pages/Programmes";
import Blogs from "./pages/newsroom/Blogs";
import BlogDetail from "./pages/newsroom/BlogDetail";
import PhotoNews from "./pages/newsroom/PhotoNews";
import MadeInTheNews from "./pages/newsroom/MadeInTheNews";
import PressReleases from "./pages/newsroom/PressReleases";
import Communique from "./pages/newsroom/Communique";
import Speeches from "./pages/newsroom/Speeches";
import Newsletters from "./pages/newsroom/Newsletters";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminNewsroom from "./pages/admin/AdminNewsroom";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminSocial from "./pages/admin/AdminSocial";
import AdminHeroSlides from "./pages/admin/AdminHeroSlides";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminContent from "./pages/admin/AdminContent";
import AdminTrustees from "./pages/admin/AdminTrustees";
import AdminAdvisors from "./pages/admin/AdminAdvisors";
import AdminContactInbox from "./pages/admin/AdminContactInbox";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/board-of-trustees" element={<BoardOfTrustees />} />
            <Route path="/about/board-of-trustees/:slug" element={<TrusteeProfile />} />
            <Route path="/about/advisory-boards" element={<AdvisoryBoards />} />
            <Route path="/about/advisory-boards/:slug" element={<AdvisorProfile />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/values" element={<Values />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/programmes/community-journalism-fellowship" element={<CommunityJournalismFellowship />} />
            <Route path="/programmes/dialogue-and-policy-series" element={<DialoguePolicySeries />} />
            <Route path="/programmes/gender-and-social-inclusion" element={<GenderSocialInclusion />} />
            <Route path="/programmes/jac" element={<JAC />} />
            <Route path="/programmes/youth-digital-leadership" element={<YouthDigitalLeadership />} />
            <Route path="/programmes/conference" element={<Conference />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/newsroom/blogs" element={<Blogs />} />
            <Route path="/newsroom/blogs/:slug" element={<BlogDetail />} />
            <Route path="/newsroom/photo-news" element={<PhotoNews />} />
            <Route path="/newsroom/made-in-the-news" element={<MadeInTheNews />} />
            <Route path="/newsroom/press-releases" element={<PressReleases />} />
            <Route path="/newsroom/communique" element={<Communique />} />
            <Route path="/newsroom/speeches" element={<Speeches />} />
            <Route path="/newsroom/newsletters" element={<Newsletters />} />
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="hero-slides" element={<AdminHeroSlides />} />
              <Route path="newsroom" element={<AdminNewsroom />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="social" element={<AdminSocial />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="trustees" element={<AdminTrustees />} />
              <Route path="advisors" element={<AdminAdvisors />} />
              <Route path="inbox" element={<AdminContactInbox />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


