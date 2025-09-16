import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, Users, Check, Phone, X, Filter, SortAsc, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SearchResult } from "@/lib/gemini";
import React from "react";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  onClose: () => void;
}

type SortOption = 'rating' | 'duration' | 'seats';
type FilterOption = 'all' | 'short' | 'medium' | 'long';

const SearchResults = ({ results, isLoading, onClose }: SearchResultsProps) => {
  const [sortBy, setSortBy] = React.useState<SortOption>('rating');
  const [filterBy, setFilterBy] = React.useState<FilterOption>('all');
  const [expandedCard, setExpandedCard] = React.useState<string | null>(null);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  // Handle click outside
  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = React.useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  React.useEffect(() => {
    // Hide navigation bar
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.display = 'none';
    }

    // Add click outside listener
    document.addEventListener('mousedown', handleClickOutside);

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Cleanup
    return () => {
      // Show navigation bar
      if (navbar) {
        navbar.style.display = 'block';
      }
      // Remove click outside listener
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore body scroll
      document.body.style.overflow = 'unset';
    };
  }, [handleClickOutside]);

  React.useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const getDurationDays = (duration: string): number => {
    return parseInt(duration.split(' ')[0]);
  };

  const filterResults = (results: SearchResult[]): SearchResult[] => {
    if (filterBy === 'all') return results;
    
    return results.filter(result => {
      const days = getDurationDays(result.duration);
      switch (filterBy) {
        case 'short': return days <= 3;
        case 'medium': return days > 3 && days <= 7;
        case 'long': return days > 7;
        default: return true;
      }
    });
  };

  const sortResults = (results: SearchResult[]): SearchResult[] => {
    return [...results].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'duration':
          return getDurationDays(a.duration) - getDurationDays(b.duration);
        case 'seats':
          return b.availableSeats - a.availableSeats;
        default:
          return 0;
      }
    });
  };

  const processedResults = sortResults(filterResults(results));

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100]">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 relative"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-lg text-gray-600">Searching for the perfect trip...</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <div 
        className="fixed inset-0 z-[100] overflow-y-auto"
      >
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-4xl relative"
          >
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 bg-white text-gray-500 hover:text-gray-700 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 z-[70]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Available Travel Packages
                </h2>
                <p className="text-gray-600">
                  We found {processedResults.length} packages matching your criteria
                </p>
              </div>

              {/* Filters and Sort */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Duration:</span>
                  </div>
                  <div className="flex gap-2">
                    {[
                      { value: 'all', label: 'All' },
                      { value: 'short', label: '1-3 Days' },
                      { value: 'medium', label: '4-7 Days' },
                      { value: 'long', label: '8+ Days' }
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant={filterBy === option.value ? "default" : "outline"}
                        size="sm"
                        className={`text-sm ${filterBy === option.value ? 'bg-blue-600 text-white' : ''}`}
                        onClick={() => setFilterBy(option.value as FilterOption)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <SortAsc className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  </div>
                  <div className="flex gap-2">
                    {[
                      { value: 'rating', label: 'Rating' },
                      { value: 'duration', label: 'Duration' },
                      { value: 'seats', label: 'Availability' }
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant={sortBy === option.value ? "default" : "outline"}
                        size="sm"
                        className={`text-sm ${sortBy === option.value ? 'bg-blue-600 text-white' : ''}`}
                        onClick={() => setSortBy(option.value as SortOption)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {processedResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${
                      expandedCard === result.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setExpandedCard(expandedCard === result.id ? null : result.id)}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative">
                        <img
                          src={result.image}
                          alt={result.title}
                          className="w-full h-48 md:h-64 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-semibold">{result.rating}</span>
                        </div>
                      </div>

                      <div className="p-6 md:w-2/3">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                            {result.title}
                            <MapPin className="h-4 w-4 text-primary" />
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {result.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{result.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{result.availableSeats} seats left</span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <div className="font-semibold text-gray-900">Highlights:</div>
                          <div className="grid grid-cols-2 gap-2">
                            {result.highlights.map((highlight, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-sm text-gray-600"
                              >
                                <Check className="w-4 h-4 text-green-500" />
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-end gap-4">
                          <Button 
                            variant="outline" 
                            className="flex items-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleContactClick();
                            }}
                          >
                            <Phone className="w-4 h-4" />
                            Contact Us
                          </Button>
                          <Button 
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {processedResults.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600">No packages found matching your filters.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setFilterBy('all');
                      setSortBy('rating');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}

              <div className="mt-8 text-center border-t border-gray-100 pt-6">
                <p className="text-gray-600 mb-4">
                  Want to customize this package or need more information?
                </p>
                <Button 
                  onClick={handleContactClick}
                  className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 mx-auto"
                >
                  <Phone className="w-4 h-4" />
                  Contact Our Travel Experts
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 