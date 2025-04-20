import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

const data = [
  { title: 'Shop A', Price: '₹500', Distance: '2.5 km', description: 'Shop A is known for its wide variety of products and excellent customer service.' },
  { title: 'Shop B', Price: '₹300', Distance: '1.2 km', description: 'Shop B offers a wide range of electronics and gadgets at affordable prices.' },
  { title: 'Shop C', Price: '₹150', Distance: '3.0 km', description: 'Shop C is famous for its high-quality groceries and fresh produce.' },
  { title: 'Shop D', Price: '₹200', Distance: '0.8 km', description: 'Shop D specializes in organic products and home essentials.' },
  { title: 'Shop E', Price: '₹600', Distance: '4.5 km', description: 'Shop E has a premium collection of clothing and accessories.' },
  { title: 'Shop F', Price: '₹450', Distance: '2.0 km', description: 'Shop F offers home decor items and unique art pieces.' },
];

export default function CarouselRatio() {
  return (
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
        // Hides scrollbar across most browsers
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE 10+
        '&::-webkit-scrollbar': {
          display: 'none', // Chrome, Safari, Edge
        },
      }}
    >
      {data.map((item) => (
        <Card
          orientation="horizontal"
          size="md"
          key={item.title}
          variant="outlined"
          sx={{
            maxWidth: '25%',
            flexShrink: 0,
            padding: 2,
            boxShadow: 'md',
            borderRadius: 'md',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Box sx={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
            <Typography level="h5" sx={{ fontSize: '1rem' }}>{item.title}</Typography>
            <Typography level="body-md">{item.Price}</Typography>
            <Typography level="body-md">{item.Distance}</Typography>
            <Typography
              level="body-md"
              sx={{
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block',
                width: '100%',
                height: 'auto',
              }}
            >
              {item.description}
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
