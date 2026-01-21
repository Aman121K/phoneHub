import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Avatar,
  Chip,
  Divider,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  LocationOn,
  Share,
  Info,
  VerifiedUser,
} from '@mui/icons-material';
import './ListingCard.css';

const ListingCard = ({ listing, className, isHome = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);

  // Get all images for the listing
  const getImages = () => {
    if (listing.images && Array.isArray(listing.images) && listing.images.length > 0) {
      return listing.images.filter(img => img);
    }
    if (listing.imageUrl || listing.image_url) {
      return [listing.imageUrl || listing.image_url];
    }
    return [];
  };

  const images = getImages();
  const hasMultipleImages = images.length > 1;
  const displayImage = imageError || images.length === 0 ? '/logo.png' : images[currentImageIndex];

  const handlePrevious = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setImageError(false);
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setImageError(false);
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMultipleImages) {
      handleNext(e);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getSellerInitial = (name) => {
    return name ? name.charAt(0).toLowerCase() : 's';
  };

  const getSellerColor = (name) => {
    const colors = ['#2563eb', '#f97316']; // Blue and Orange only
    const hash = name ? name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
    return colors[hash % colors.length];
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const listingUrl = `${window.location.origin}/listing/${listing._id || listing.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: listing.description || listing.title,
        url: listingUrl
      }).catch(() => {
        // Fallback to clipboard if share fails
        navigator.clipboard.writeText(listingUrl);
        alert('Link copied to clipboard!');
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(listingUrl);
      alert('Link copied to clipboard!');
    }
  };

  const handleVerificationInfoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVerificationModalOpen(true);
  };

  const handleCloseModal = () => {
    setVerificationModalOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Determine the correct route based on listing type
  const listingRoute = listing.listingType === 'auction' 
    ? `/auction/${listing._id || listing.id}` 
    : `/listing/${listing._id || listing.id}`;

  return (
    <Card
      component={Link}
      to={listingRoute}
      className={isHome ? `home-listing-card listing-card ${className || ''}` : `listing-card ${className || ''}`}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        width: '240px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        transition: 'none',
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '180px',
          overflow: 'hidden',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px 12px 0 0',
        }}
      >
        {/* Share Button */}
        <IconButton
          onClick={handleShare}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            width: 32,
            height: 32,
            zIndex: 10,
            // '&:hover': {
            //   backgroundColor: 'rgba(255, 255, 255, 1)',
            // },
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
          aria-label="Share listing"
        >
          <Share sx={{ fontSize: '1rem', color: '#1e293b' }} />
        </IconButton>
        <CardMedia
          component="img"
          image={displayImage}
          alt={listing.title}
          onError={handleImageError}
          onClick={handleImageClick}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            cursor: hasMultipleImages ? 'pointer' : 'default',
            ...(imageError && {
              objectFit: 'contain',
              padding: '1rem',
              maxWidth: '80%',
              maxHeight: '80%',
            }),
          }}
        />
        
        {hasMultipleImages && !imageError && (
          <>
            <IconButton
              className="carousel-btn carousel-btn-left"
              onClick={handlePrevious}
              aria-label="Previous image"
              size="small"
              sx={{
                position: 'absolute',
                left: 4,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                width: 24,
                height: 24,
                // '&:hover': {
                //   backgroundColor: 'rgba(255, 255, 255, 1)',
                // },
                zIndex: 2,
                '& svg': {
                  fontSize: '1rem',
                },
              }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              className="carousel-btn carousel-btn-right"
              onClick={handleNext}
              aria-label="Next image"
              size="small"
              sx={{
                position: 'absolute',
                right: 4,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                width: 24,
                height: 24,
                // '&:hover': {
                //   backgroundColor: 'rgba(255, 255, 255, 1)',
                // },
                zIndex: 2,
                '& svg': {
                  fontSize: '1rem',
                },
              }}
            >
              <ChevronRight />
            </IconButton>
            <Chip
              label={`${currentImageIndex + 1} / ${images.length}`}
              size="small"
              sx={{
                position: 'absolute',
                bottom: 4,
                left: 4,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                fontSize: '0.65rem',
                height: '18px',
                '& .MuiChip-label': {
                  padding: '0 6px',
                },
              }}
            />
          </>
        )}
      </Box>
      
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          p: '0.65rem', 
          '&:last-child': { pb: '0.65rem' },
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          overflow: 'visible',
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#000000',
            mb: '0.3rem',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif",
            minHeight: '2.4em',
          }}
        >
          {listing.title}
        </Typography>
        
        {/* Product Attributes */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', mb: '0.15rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Typography variant="body2" sx={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 400 }}>
              Age
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.65rem', fontWeight: 600, color: '#000000' }}>
              {listing.condition || 'Brand New'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Typography variant="body2" sx={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 400 }}>
              Storage
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.65rem', fontWeight: 600, color: '#000000' }}>
              {listing.storage || 'N/A'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Typography variant="body2" sx={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 400 }}>
              Warranty
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.65rem', fontWeight: 600, color: '#000000' }}>
              {listing.warranty || 'Yes'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: '0.1rem', borderColor: '#e5e7eb' }} />

        {/* Seller and Location */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom:2 }}>
          {/* Seller Information */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                bgcolor: getSellerColor(listing.user?.name),
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              {getSellerInitial(listing.user?.name)}
            </Avatar>
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: '0.7rem', 
                fontWeight: 500, 
                color: '#000000',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {listing.user?.name || 'Seller'}
            </Typography>
          </Box>

          {/* Location Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <LocationOn sx={{ fontSize: '0.75rem', color: '#f97316' }} />
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: '0.7rem', 
                color: '#6b7280', 
                textTransform: 'capitalize',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {listing.user?.city || listing.city || 'Ajman'}
            </Typography>
          </Box>
        </Box>
        
        {/* Price */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#008556',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            AED {listing.price}
          </Typography>
        </Box>
      </CardContent>

      {/* Verified Seller Bar (OLX Style) */}
      {listing.user?.verifiedBatch && (
        <Box
          sx={{
            backgroundColor: '#e3f2fd',
            padding: '0.5rem 0.65rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #e5e7eb',
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <VerifiedUser 
              sx={{ 
                fontSize: '1rem', 
                color: '#1976d2',
              }} 
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.7rem',
                fontWeight: 500,
                color: '#1976d2',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              VERIFIED SELLER
            </Typography>
          </Box>
          <IconButton
            onClick={handleVerificationInfoClick}
            sx={{
              padding: '0.25rem',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
              },
            }}
            size="small"
          >
            <Info sx={{ fontSize: '0.9rem', color: '#1976d2' }} />
          </IconButton>
        </Box>
      )}

      {/* Verification Info Modal */}
      <Modal
        open={verificationModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Fade in={verificationModalOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: '400px' },
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              padding: '24px',
              outline: 'none',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', mb: '20px' }}>
              <Box
                sx={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#e3f2fd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <VerifiedUser sx={{ fontSize: '28px', color: '#1976d2' }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#1f2937',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Verified Seller
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  This seller is verified
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: '20px' }} />

            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  mb: '8px',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Verified Since
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#1f2937',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {formatDate(listing.user?.verifiedBatchPurchasedAt)}
              </Typography>
            </Box>

            <Box sx={{ mt: '24px', pt: '20px', borderTop: '1px solid #e5e7eb' }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.8125rem',
                  color: '#6b7280',
                  lineHeight: 1.6,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                This seller has completed our verification process and has been verified since the purchase date shown above.
              </Typography>
            </Box>

            <Box sx={{ mt: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                onClick={handleCloseModal}
                sx={{
                  backgroundColor: '#f3f4f6',
                  '&:hover': {
                    backgroundColor: '#e5e7eb',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#374151',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Close
                </Typography>
              </IconButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Card>
  );
};

export default ListingCard;

