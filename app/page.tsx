import ProjectWorkspace from '@/components/ProjectWorkspace';
import demoProject from '@/data/demo-project';

export default function Home() {
  return <ProjectWorkspace project={demoProject} />;
}
