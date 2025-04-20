import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

const data = [
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    description: '4.21M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    title: 'Lake view',
    description: '4.74M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    title: 'Sunset beach',
    description: '5.01M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Snow valley',
    description: '3.41M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    title: 'Urban lights',
    description: '6.21M views',
  },
];

export default function CarouselRatio() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        py: 3,
        overflowX: 'auto',
        width: '100%',
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {data.map((item) => (
        <Card
          orientation="horizontal"
          size="lg"
          key={item.title}
          variant="outlined"
          sx={{
            minWidth: '30%',
            flexShrink: 0,
            padding: 2,
            boxShadow: 'lg',
            borderRadius: 'lg',
          }}
        >
          <AspectRatio ratio="1" sx={{ minWidth: 120 }}>
            <img
              srcSet={`${item.src}?h=280&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.src}?h=280&fit=crop&auto=format`}
              alt={item.title}
            />
          </AspectRatio>
          <Box sx={{ whiteSpace: 'nowrap', mx: 2 }}>
            <Typography level="h5">{item.title}</Typography>
            <Typography level="body-md">{item.description}</Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
