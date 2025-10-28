import { useState, useEffect } from "react";
import Head from "next/head";
import { Header } from "@/components/Header";
import { DiscoverHeader } from "@/components/DiscoverHeader";
import { ChefGrid } from "@/components/ChefGrid";
import { ChefDetailModal } from "@/components/ChefDetailModal";
import { SignupFlow } from "@/components/SignupFlow";
import { ChefSignupFlow } from "@/components/ChefSignupFlow";
import { ChefDashboard } from "@/components/ChefDashboard";
import { ChatModal } from "@/components/ChatModal";
import { VideoBackground } from "@/components/VideoBackground";
import { Footer } from "@/components/Footer";
import { ReviewExperienceModal } from "@/components/ReviewExperienceModal";
import { ArtisticAmpersand } from "@/components/ArtisticAmpersand";
import { AnimatedCulinaryBackground } from "@/components/AnimatedCulinaryBackground";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import type { FilterOptions } from "@/components/FilterModal";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

// Mock chef data
const mockChefs = [
  {
    id: "1",
    name: "Marco",
    surname: "Pellegrini",
    bio: "Passionate Italian chef specialising in authentic regional cuisine. Trained in Tuscany and bringing traditional flavours to modern South African dining.",
    location: "Cape Town, Western Cape",
    specialties: ["Italian", "Mediterranean", "Fine Dining"],
    rating: 4.8,
    reviewCount: 23,
    image:
      "https://images.unsplash.com/photo-1622001635931-3874528bd099?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjaGVmJTIwY29va2luZyUyMGdvdXJtZXQlMjBmb29kfGVufDF8fHx8MTc1ODQxMzU1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    priceRange: "R450-650 pp",
    qualifications: [
      "Le Cordon Bleu Paris",
      "Michelin Experience",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400",
      "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?w=400",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
      "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400",
    ],
  },
  {
    id: "2",
    name: "Amara",
    surname: "Johnson",
    bio: "Creative fusion chef combining African flavours with international techniques. Award-winning culinary artist with 10 years of fine dining experience.",
    location: "Johannesburg, Gauteng",
    specialties: [
      "African Fusion",
      "Vegan",
      "Creative Plating",
    ],
    rating: 4.9,
    reviewCount: 31,
    image:
      "https://images.unsplash.com/photo-1719329466199-f18fb7f6972e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwcG9ydHJhaXQlMjBjb29raW5nJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NTg0MTM2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    priceRange: "R380-520 pp",
    qualifications: [
      "Culinary Arts Degree",
      "James Beard Nominee",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=400",
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400",
      "https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?w=400",
    ],
  },
  {
    id: "3",
    name: "Jean-Luc",
    surname: "Dubois",
    bio: "French-trained pastry chef and culinary expert. Specialising in elegant French cuisine and exquisite dessert presentations.",
    location: "Stellenbosch, Western Cape",
    specialties: ["French", "Pastry", "Wine Pairing"],
    rating: 4.7,
    reviewCount: 18,
    image:
      "https://images.unsplash.com/photo-1718939043990-83078968ae7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcGxhdGVkJTIwZm9vZCUyMGVsZWdhbnR8ZW58MXx8fHwxNzU4NDEzNjI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    priceRange: "R520-780 pp",
    qualifications: [
      "École Ritz Escoffier",
      "Master Pastry Chef",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
    ],
  },
  {
    id: "4",
    name: "Thandiwe",
    surname: "Mthembu",
    bio: "Traditional South African cuisine expert with modern presentation. Grandmother's recipes meet contemporary culinary artistry.",
    location: "Durban, KwaZulu-Natal",
    specialties: [
      "South African",
      "Traditional",
      "Comfort Food",
    ],
    rating: 4.6,
    reviewCount: 27,
    image:
      "https://images.unsplash.com/photo-1622001635931-3874528bd099?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjaGVmJTIwY29va2luZyUyMGdvdXJtZXQlMjBmb29kfGVufDF8fHx8MTc1ODQxMzU1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    priceRange: "R290-420 pp",
    qualifications: [
      "Institute of Culinary Arts SA",
      "Heritage Cuisine Specialist",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400",
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400",
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400",
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
    ],
  },
  {
    id: "5",
    name: "Sofia",
    surname: "Rodriguez",
    bio: "Spanish culinary expert bringing authentic tapas and paella traditions to South Africa. Trained in Barcelona's finest establishments.",
    location: "Cape Town, Western Cape",
    specialties: ["Spanish", "Tapas", "Seafood"],
    rating: 4.8,
    reviewCount: 15,
    image:
      "https://images.unsplash.com/photo-1719329466199-f18fb7f6972e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwcG9ydHJhaXQlMjBjb29raW5nJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NTg0MTM2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    priceRange: "R420-600 pp",
    qualifications: [
      "Barcelona Culinary School",
      "Paella Master",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
      "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400",
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400",
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
      "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=400",
      "https://images.unsplash.com/photo-1580959375944-0e5b8e9a3d9d?w=400",
    ],
  },
  {
    id: "6",
    name: "Raj",
    surname: "Patel",
    bio: "Master of authentic Indian cuisine with modern presentation. Specialising in regional dishes from across the subcontinent.",
    location: "Johannesburg, Gauteng",
    specialties: ["Indian", "Curry", "Spice Blends"],
    rating: 4.7,
    reviewCount: 22,
    image:
      "https://images.unsplash.com/photo-1622001635931-3874528bd099?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjaGVmJTIwY29va2luZyUyMGdvdXJtZXQlMjBmb29kfGVufDF8fHx8MTc1ODQxMzU1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    priceRange: "R350-480 pp",
    qualifications: [
      "Mumbai Culinary Institute",
      "Spice Expert Certification",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400",
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400",
      "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=400",
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400",
    ],
  },
];

export default function Home() {
  const [filters, setFilters] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isChefSignupOpen, setIsChefSignupOpen] = useState(false);
  const [selectedChef, setSelectedChef] = useState<any>(null);
  const [isChefModalOpen, setIsChefModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentChef, setCurrentChef] = useState<any>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Filter chefs based on search query and filters
  const filteredChefs = mockChefs.filter((chef) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName =
        chef.name.toLowerCase().includes(query) ||
        chef.surname.toLowerCase().includes(query) ||
        `${chef.name} ${chef.surname}`
          .toLowerCase()
          .includes(query);
      const matchesSpecialty = chef.specialties.some(
        (specialty) => specialty.toLowerCase().includes(query),
      );
      const matchesLocation = chef.location
        .toLowerCase()
        .includes(query);

      if (
        !matchesName &&
        !matchesSpecialty &&
        !matchesLocation
      ) {
        return false;
      }
    }

    // Additional filters can be applied here based on the filters state
    if (
      filters.location &&
      !chef.location
        .toLowerCase()
        .includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    if (filters.rating && chef.rating < filters.rating) {
      return false;
    }

    if (filters.specialties && filters.specialties.length > 0) {
      const hasMatchingSpecialty = filters.specialties.some(
        (specialty: string) =>
          chef.specialties.some((chefSpecialty) =>
            chefSpecialty
              .toLowerCase()
              .includes(specialty.toLowerCase()),
          ),
      );
      if (!hasMatchingSpecialty) {
        return false;
      }
    }

    return true;
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSignupComplete = (userData: any) => {
    setCurrentUser(userData);
    setIsSignupOpen(false);
    console.log("User signed up:", userData);
  };

  const handleChefLike = (chefId: string) => {
    console.log("Chef liked:", chefId);
  };

  const handleChefSelect = (chef: any) => {
    setSelectedChef(chef);
    setIsChefModalOpen(true);
  };

  const handleBookNow = (chef: any) => {
    if (!currentUser) {
      setIsSignupOpen(true);
    } else {
      console.log("Booking chef:", chef.id);
      // Handle booking flow
    }
  };

  const handleSendMessage = (chef: any) => {
    if (!currentUser) {
      setIsSignupOpen(true);
    } else {
      console.log("Messaging chef:", chef.id);
      setIsChatModalOpen(true);
    }
  };

  const handleContactClick = () => {
    console.log("Contact us clicked");
    // Handle contact form or redirect to contact page
    if (typeof window !== 'undefined') {
      window.open("mailto:hello@tableandplate.co.za", "_blank");
    }
  };

  const handleChefSignupClick = () => {
    setIsChefSignupOpen(true);
  };

  const handleChefSignupComplete = (chefData: any) => {
    setIsChefSignupOpen(false);
    console.log("Chef signed up:", chefData);
    // Handle chef signup completion - could show success message or redirect
  };

  const handleMessageClick = () => {
    if (!currentUser) {
      setIsSignupOpen(true);
    } else {
      setIsChatModalOpen(true);
    }
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    // Handle profile menu
  };

  const handleReviewClick = () => {
    setIsReviewModalOpen(true);
  };

  const handleTermsClick = () => {
    console.log("Terms clicked");
    // Navigate to terms page or show modal
  };

  const handlePrivacyClick = () => {
    console.log("Privacy policy clicked");
    // Navigate to privacy page or show modal
  };

  const handleChefLogout = () => {
    setCurrentChef(null);
    console.log("Chef logged out");
  };

  // If chef is logged in, show chef dashboard
  if (currentChef) {
    return (
      <>
        <Head>
          <title>Chef Dashboard - Table & Plate</title>
          <meta name="description" content="Manage your chef profile and bookings" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen bg-black text-white relative">
          <VideoBackground />
          <div className="relative z-10">
            <ChefDashboard
              chefData={currentChef}
              onLogout={handleChefLogout}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Table & Plate - Luxury Made Personal</title>
        <meta name="description" content="Connect with private chefs in South Africa. From our chefs hands to your table. Luxury made personal." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-black text-white relative">
        {/* Video Background */}
        <VideoBackground />

        <div className="relative z-10">
          <Header
            userName={
              currentUser
                ? `${currentUser.firstName} ${currentUser.lastName}`
                : "Guest"
            }
            messageCount={2}
            isLoggedIn={!!currentUser}
            onSearch={handleSearchChange}
            onContactClick={handleContactClick}
            onChefSignupClick={handleChefSignupClick}
            onMessageClick={handleMessageClick}
            onProfileClick={handleProfileClick}
          />

          <main className="min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
              {!currentUser && (
                <div className="mb-12 sm:mb-16 text-center">
                  <div className="mb-6 sm:mb-8">
                    <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-6">
                      Welcome to
                    </p>
                    <div className="flex justify-center mb-6">
                      <AnimatedLogo />
                    </div>
                    <p className="text-base sm:text-lg lg:text-xl text-white/70 mb-6 sm:mb-8 px-4">
                      from our chefs hands to your table. luxury made personal.
                    </p>
                  </div>
                  <div className="relative inline-block">
                    <AnimatedCulinaryBackground />
                    <Button
                      onClick={() => setIsSignupOpen(true)}
                      className="relative z-10 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 px-6 sm:px-8 py-3 text-base sm:text-lg overflow-hidden shadow-lg shadow-pink-500/20 transition-all duration-300 hover:scale-105"
                    >
                      <UserPlus className="w-5 h-5 mr-2" />
                      Get Started
                    </Button>
                  </div>
                </div>
              )}

              {/* Discover Header with Filters and Sort */}
              {currentUser && (
                <DiscoverHeader
                  onFilterChange={(filters: FilterOptions) => {
                    console.log("Filters applied:", filters);
                    // TODO: Apply filters to chef list
                  }}
                  onSortChange={(sortBy: string) => {
                    console.log("Sort by:", sortBy);
                    // TODO: Apply sorting to chef list
                  }}
                />
              )}

              <ChefGrid
                chefs={filteredChefs}
                onChefLike={handleChefLike}
                onChefSelect={handleChefSelect}
                isUserSignedUp={!!currentUser}
              />
            </div>
          </main>

          {/* Footer */}
          <Footer
            onContactClick={handleContactClick}
            onReviewClick={handleReviewClick}
            onTermsClick={handleTermsClick}
            onPrivacyClick={handlePrivacyClick}
          />
        </div>

        {/* Signup Flow Modal */}
        {isSignupOpen && (
          <SignupFlow
            onComplete={handleSignupComplete}
            onClose={() => setIsSignupOpen(false)}
          />
        )}

        {/* Chef Signup Flow Modal */}
        {isChefSignupOpen && (
          <ChefSignupFlow
            onComplete={handleChefSignupComplete}
            onClose={() => setIsChefSignupOpen(false)}
          />
        )}

        {/* Chef Detail Modal */}
        <ChefDetailModal
          chef={selectedChef}
          isOpen={isChefModalOpen}
          onClose={() => setIsChefModalOpen(false)}
          onBookNow={handleBookNow}
          onSendMessage={handleSendMessage}
        />

        {/* Chat Modal */}
        <ChatModal
          isOpen={isChatModalOpen}
          onClose={() => setIsChatModalOpen(false)}
          conversations={[]}
          currentUser={currentUser}
        />

        {/* Review Experience Modal */}
        <ReviewExperienceModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
        />
      </div>
    </>
  );
}
