import { Tab, Tabs, Box } from "@mui/material";
import TabDeleteButton from "../atoms/TabDeleteButton";
import { useState, useEffect } from "react";
import DepartmentType from "../../types/department";

type Props = {
  initialDepartments: DepartmentType[];
};

const DepartmentTabs: React.FC<Props> = ({ initialDepartments }) => {
  const [departments, setDepartments] =
    useState<DepartmentType[]>(initialDepartments);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>(
    initialDepartments[0]?.departmentName ?? ""
  );

  useEffect(() => {
    setDepartments(initialDepartments);
  }, [initialDepartments]);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newDepartmentName: string
  ) => {
    setSelectedDepartmentId(newDepartmentName);
  };

  const handleDeleteDepartment = (departmentName: string) => {
    const newDepartments = departments.filter(
      (dept) => dept.departmentName !== departmentName
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
        sx={{
          minHeight: "40px",
          "& .MuiTab-root": {
            minHeight: "40px",
            padding: "8px 16px 12px",
          },
        }}
      >
        <Tab
          key={"ALL"}
          value={"ALL"}
          label={"ALL"}
          iconPosition="end"
          sx={{
            ":focus": {
              outline: "none",
            },
          }}
        />
        {departments.map((department: DepartmentType) => (
          <Tab
            key={department.departmentName}
            value={department.departmentName}
            label={department.departmentName}
            icon={
              <TabDeleteButton
                // departmentId={department.departmentId}
                // departmentName={department.departmentName}
                onDelete={() =>
                  handleDeleteDepartment(department.departmentName)
                }
              />
            }
            iconPosition="end"
            sx={{
              ":focus": {
                outline: "none",
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default DepartmentTabs;
