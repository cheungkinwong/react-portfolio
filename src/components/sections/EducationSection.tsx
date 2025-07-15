import { useEducationStore } from '../../store/useEducationStore';
import {  List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useEffect } from 'react';

const EducationSection = () => {
  const { educations, loading, fetchEducations } = useEducationStore();

  useEffect(() => {
    if (educations.length === 0) {
      fetchEducations();
    }
  }, [educations,fetchEducations]);


  if (loading) return <CircularProgress />;

  return (
    <List dense>
      {educations.map((edu) => (
   <ListItem key={edu.id} disableGutters>
      <ListItemText
        primary={`${edu.school} (${new Date(edu.startDate).getFullYear()} - ${edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'})`}
        secondary={edu.course}
      />
    </ListItem>
      ))}
    </List>
  );
};

export default EducationSection;

