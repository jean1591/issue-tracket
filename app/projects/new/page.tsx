import ProjectFormSkeleton from "./loading";
import dynamic from "next/dynamic";

const ProjectForm = dynamic(
  () => import("@/app/projects/_components/ProjectForm"),
  {
    ssr: false,
    loading: () => <ProjectFormSkeleton />,
  }
);

const NewProjectPage = () => {
  return <ProjectForm />;
};

export default NewProjectPage;
