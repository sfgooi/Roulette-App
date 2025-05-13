import { Tab, Tabs, Box } from "@mui/material";
import TabDeleteButton from "../atoms/TabDeleteButton";
import { useState } from "react";
import DepartmentType from "../../types/department";

const DepartmentTabs: React.FC<{ initialDepartments: DepartmentType[] }> = ({
  initialDepartments,
}) => {
  const [departments, setDepartments] = useState<DepartmentType[]>(initialDepartments);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>(
    initialDepartments[0]?.departmentId ?? 0
  );

  const handleTabChange = (
    event: React.SyntheticEvent,
    newDepartmentId: number
  ) => {
    setSelectedDepartmentId(newDepartmentId);
  };

  const handleDeleteDepartment = (departmentId: number) => {
    const newDepartments = departments.filter(
      (dept) => dept.departmentId !== departmentId
    );
    setDepartments(newDepartments);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Tabs
        value={selectedDepartmentId}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons
        aria-label="Tabs"
      >
        {departments.map((department: DepartmentType) => (
          <Tab
            key={department.departmentId}
            value={department.departmentId}
            label={department.departmentName}
            icon={
              <TabDeleteButton
                departmentId={department.departmentId}
                departmentName={department.departmentName}
                onDelete={() => handleDeleteDepartment(department.departmentId)}
              />
            }
            iconPosition="end"
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default DepartmentTabs;
