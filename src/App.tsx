import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MapScreen from "./pages/MapScreen";
import Navigation from "./pages/Navigation";
import SOS from "./pages/SOS";
import Contacts from "./pages/Contacts";
import Report from "./pages/Report";
import ReportsMap from "./pages/ReportsMap";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" replace />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<MapScreen />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/report" element={<Report />} />
          <Route path="/reports" element={<ReportsMap />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
