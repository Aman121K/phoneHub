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
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  LocationOn,
  Share,
} from '@mui/icons-material';
import './ListingCard.css';

const ListingCard = ({ listing, className }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

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

  // Determine the correct route based on listing type
  const listingRoute = listing.listingType === 'auction' 
    ? `/auction/${listing._id || listing.id}` 
    : `/listing/${listing._id || listing.id}`;

  return (
    <Card
      component={Link}
      to={listingRoute}
      className={`listing-card ${className || ''}`}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        height: '376px',
        width: '240px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'visible',
        border: '1px solid #e2e8f0',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        // '&:hover': {
        //   transform: 'translateY(-8px)',
        //   boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
        //   borderColor: '#2563eb',
        // },
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
          p: '0.75rem', 
          '&:last-child': { pb: '0.75rem' },
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          overflow: 'visible',
          minHeight: '196px',
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#000000',
            mb: '0.4rem',
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', mb: '0.35rem' }}>
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

        <Divider sx={{ my: '0.35rem' }} />

        {/* Seller Information */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.4rem', mb: '0.35rem' }}>
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

        <Divider sx={{ my: '0.35rem' }} />

        {/* Location and Price */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: '0.35rem' }}>
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
    </Card>
  );
};

export default ListingCard;

