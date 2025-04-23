import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Modal from '@mui/material/Modal';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';

const data = [
  {
    title: 'Shop A',
    Price: '₹500',
    Distance: '2.5 km',
    description: 'Shop A is known for its wide variety of products and excellent customer service.',
    address: '123 Market Road, City Center',
    image: 'https://via.placeholder.com/300x180?text=Shop+A',
  },
  {
    title: 'Shop B',
    Price: '₹300',
    Distance: '1.2 km',
    description: 'Shop B offers a wide range of electronics and gadgets at affordable prices.',
    address: '456 Tech Park Lane',
    image: 'https://via.placeholder.com/300x180?text=Shop+B',
  },
  {
    title: 'Shop C',
    Price: '₹150',
    Distance: '3.0 km',
    description: 'Shop C is famous for its high-quality groceries and fresh produce.',
    address: '789 Green Street',
    image: 'https://via.placeholder.com/300x180?text=Shop+C',
  },
  {
    title: 'Shop D',
    Price: '₹200',
    Distance: '0.8 km',
    description: 'Shop D specializes in organic products and home essentials.',
    address: '21 Nature Ave',
    image: 'https://via.placeholder.com/300x180?text=Shop+D',
  },
  {
    title: 'Shop E',
    Price: '₹600',
    Distance: '4.5 km',
    description: 'Shop E has a premium collection of clothing and accessories.',
    address: 'Luxury Lane, Uptown',
    image: 'https://via.placeholder.com/300x180?text=Shop+E',
  },
  {
    title: 'Shop F',
    Price: '₹450',
    Distance: '2.0 km',
    description: 'Shop F offers home decor items and unique art pieces.',
    address: 'Artisan Blvd',
    image: 'https://via.placeholder.com/300x180?text=Shop+F',
  },
];

export default function CarouselRatio() {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          py: 2,
          overflowX: 'auto',
          width: '100%',
          scrollSnapType: 'x mandatory',
          '& > *': {
            scrollSnapAlign: 'center',
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {data.map((item) => (
          <Card
            orientation="vertical"
            size="md"
            key={item.title}
            variant="outlined"
            onClick={() => handleOpen(item)}
            sx={{
              width: 220,
              flexShrink: 0,
              cursor: 'pointer',
              boxShadow: 'md',
              borderRadius: '20px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 240, 240, 0.85))',
              '&:hover': {
                transform: 'scale(1.1) translateY(-5px)',  // Pop-up effect with translation
                boxShadow: 'lg',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(240, 240, 240, 0.9))',
              },
              textAlign: 'center',
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: 140,
                objectFit: 'cover',
                borderRadius: '12px 12px 0 0',
              }}
            />
            <CardContent sx={{ padding: '1rem' }}>
              <Typography level="title-md" fontWeight="lg" mb={0.5}>
                {item.title}
              </Typography>
              <Typography level="body-sm" color="primary">
                {item.Price}
              </Typography>
              <Typography level="body-sm" color="neutral">
                {item.Distance}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Typography
        level="body-sm"
        textAlign="center"
        color='black'
        mt={1}
        fontStyle="italic"
      >
        ← Swipe or scroll sideways to view more shops →
      </Typography>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 420,
            bgcolor: '#ffffff',
            background: 'linear-gradient(to bottom right, #ffffff, #f7f7f7)',
            borderRadius: '20px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {selectedItem && (
            <>
              <Box sx={{ marginBottom: 2 }}>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  style={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 12,
                  }}
                />
              </Box>

              <Box sx={{ marginBottom: 2 }}>
                <Typography level="h4" mb={1}>
                  {selectedItem.title}
                </Typography>
                <Typography color="primary">
                  {selectedItem.Price} • {selectedItem.Distance}
                </Typography>
                <Typography mb={1}>{selectedItem.description}</Typography>
                <Typography fontWeight="md">
                  <strong>Address:</strong> {selectedItem.address}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#f7f7f7',
                  padding: '10px',
                  borderRadius: '8px',
                  marginBottom: 2,
                }}
              >
                <Typography sx={{ mr: 1 }}>Quantity:</Typography>
                <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Remove />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{quantity}</Typography>
                <IconButton onClick={() => setQuantity(quantity + 1)}>
                  <Add />
                </IconButton>
              </Box>

              <Button
                variant="solid"
                color="primary"
                fullWidth
                sx={{ mt: 3, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
              >
                Add to Cart
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
