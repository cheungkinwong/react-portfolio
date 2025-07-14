import { useSoftSkillStore } from '../../store/useSoftSkillStore';
import { List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useEffect } from 'react';

const SoftSkillSection = () => {
  const { softSkills, loading, fetchSoftSkills } = useSoftSkillStore();

  useEffect(() => {
    fetchSoftSkills();
  }, [fetchSoftSkills]);

  if (loading) return <CircularProgress />;

  return (
    <List dense>
      {softSkills.map((skill) => (
        <ListItem key={skill.id} disableGutters>
          <ListItemText primary={skill.name} secondary={skill.level}/>
        </ListItem>
      ))}
    </List>
  );
};

export default SoftSkillSection;