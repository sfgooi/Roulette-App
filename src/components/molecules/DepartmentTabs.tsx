import { Tab, Tabs, Box, TextField } from "@mui/material";
import TabDeleteButton from "../atoms/TabDeleteButton";
import TabAddButton from "../atoms/TabAddButton";
import { useState, useEffect } from "react";
import DepartmentType from "../../types/department";

type Props = {
  initialDepartments: DepartmentType[];
  onDepartmentChange: (departmentName: string) => void;
  onDepartmentNameChange?: (oldName: string, newName: string) => void;
  onDepartmentDelete?: (departmentName: string) => void;
  onDepartmentAdd?: (departmentName: string) => void;
};

const DepartmentTabs: React.FC<Props> = ({
  initialDepartments,
  onDepartmentChange,
  onDepartmentNameChange,
  onDepartmentDelete,
  onDepartmentAdd,
}) => {
  const [departments, setDepartments] =
    useState<DepartmentType[]>(initialDepartments);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>(
    initialDepartments[0]?.departmentName ?? ""
  );
  const [editingDepartmentName, setEditingDepartmentName] = useState<
    string | null
  >(null);
  const [editingDepartmentValue, setEditingDepartmentValue] = useState("");

  useEffect(() => {
    setDepartments(initialDepartments);
  }, [initialDepartments]);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newDepartmentName: string
  ) => {
    setSelectedDepartmentId(newDepartmentName);
    onDepartmentChange(newDepartmentName);
  };

  const handleDeleteDepartment = (departmentName: string) => {
    if (departments.length <= 1) {
      alert("部署は最低1つ必要です。");
      return;
    }
    const newDepartments = departments.filter(
      (dept) => dept.departmentName !== departmentName
    );
    setDepartments(newDepartments);
    onDepartmentDelete?.(departmentName);
  };

  const handleAddDepartment = () => {
    const newDepartmentName = `部署${departments.length + 1}`;
    const newDepartment = { departmentName: newDepartmentName };
    setDepartments([...departments, newDepartment]);
    onDepartmentAdd?.(newDepartmentName);
  };

  const handleDepartmentNameDoubleClick = (departmentName: string) => {
    setEditingDepartmentName(departmentName);
    setEditingDepartmentValue(departmentName);
  };

  const handleDepartmentNameEditComplete = () => {
    if (
      editingDepartmentName &&
      editingDepartmentValue &&
      editingDepartmentName !== editingDepartmentValue
    ) {
      const newDepartments = departments.map((dept) =>
        dept.departmentName === editingDepartmentName
          ? { ...dept, departmentName: editingDepartmentValue }
          : dept
      );
      setDepartments(newDepartments);
      onDepartmentNameChange?.(editingDepartmentName, editingDepartmentValue);
    }
    setEditingDepartmentName(null);
  };

  const handleDepartmentNameKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleDepartmentNameEditComplete();
    } else if (event.key === "Escape") {
      setEditingDepartmentName(null);
    }
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
            label={
              editingDepartmentName === department.departmentName ? (
                <TextField
                  value={editingDepartmentValue}
                  onChange={(e) => setEditingDepartmentValue(e.target.value)}
                  onBlur={handleDepartmentNameEditComplete}
                  onKeyDown={handleDepartmentNameKeyPress}
                  autoFocus
                  size="small"
                  sx={{ width: "100px" }}
                />
              ) : (
                <span
                  onDoubleClick={() =>
                    handleDepartmentNameDoubleClick(department.departmentName)
                  }
                >
                  {department.departmentName}
                </span>
              )
            }
            icon={
              <TabDeleteButton
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
        <Tab
          key="add"
          value="add"
          icon={<TabAddButton onAdd={handleAddDepartment} />}
          sx={{
            minWidth: "40px",
            padding: "8px",
            ":focus": {
              outline: "none",
            },
          }}
        />
      </Tabs>
    </Box>
  );
};

export default DepartmentTabs;
