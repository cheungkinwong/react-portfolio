import { useHobbyStore } from '../../store/useHobbyStore';
import { List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useEffect } from 'react';

const HobbySection = () => {
  const { hobbies, loading, fetchHobbies } = useHobbyStore();

  useEffect(() => {
    fetchHobbies();
  }, [fetchHobbies]);

  if (loading) return <CircularProgress />;

  return (
    <List dense>
      {hobbies.map((hobby) => (
        <ListItem key={hobby.id} disableGutters>
          <ListItemText primary={hobby.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default HobbySection;
