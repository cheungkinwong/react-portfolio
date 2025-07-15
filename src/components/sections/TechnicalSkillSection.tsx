import { useTechnicalSkillStore } from '../../store/useTechnicalSkillStore';
import { Grid, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

import { useEffect } from 'react';

const TechnicalSkillSection = () => {
  const { technicalSkills, loading, fetchTechnicalSkills } = useTechnicalSkillStore();

  useEffect(() => {
    if (technicalSkills.length === 0) {
      fetchTechnicalSkills();
    }
  }, [technicalSkills,fetchTechnicalSkills]);

  if (loading) return <CircularProgress />;

  // Split skills into two roughly equal columns
  const midpoint = Math.ceil(technicalSkills.length / 2);
  const firstHalf = technicalSkills.slice(0, midpoint);
  const secondHalf = technicalSkills.slice(midpoint);

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <List dense>
          {firstHalf.map((skill) => (
            <ListItem key={skill.id} disableGutters>
              <ListItemText primary={skill.name} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid size={6}>
        <List dense>
          {secondHalf.map((skill) => (
            <ListItem key={skill.id} disableGutters>
              <ListItemText primary={skill.name} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default TechnicalSkillSection;
