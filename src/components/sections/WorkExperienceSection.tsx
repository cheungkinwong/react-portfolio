import { useWorkExperienceStore } from '../../store/useWorkExperienceStore';
import {  List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useEffect } from 'react';

const WorkExperienceSection = () => {
  const { workExperiences, loading, fetchWorkExperiences } = useWorkExperienceStore();

  useEffect(() => {
    if (workExperiences.length === 0) {
      fetchWorkExperiences();
    }
  }, [workExperiences,fetchWorkExperiences]);

  if (loading) return <CircularProgress />;

  return (

<List dense>
  {workExperiences.map((work) => (
    <ListItem key={work.id} disableGutters>
      <ListItemText
        primary={`${work.company} (${new Date(work.startDate).getFullYear()} - ${work.endDate ? new Date(work.endDate).getFullYear() : 'Present'})`}
        secondary={work.position}
      />
    </ListItem>
  ))}
</List>
  );
};

export default WorkExperienceSection;