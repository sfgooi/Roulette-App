import { useState } from "react";
import "./App.css";
import Heading from "./components/atoms/Heading";
import CommonButton from "./components/atoms/CommonButton";
import SettingsModal from "./components/molecules/SettingsModal";
import Roulette from "./components/organisms/Roulette";
import { Member } from "./api/dynamoDB/types";
import { useEffect } from "react";
import { getAllMembers } from "./api/dynamoDB/operations/member";
import Footer from "./components/atoms/Footer";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("ALL");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const members = await getAllMembers();
        setMembers(members);
        setFilteredMembers(members);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    if (selectedDepartment === "ALL") {
      setFilteredMembers(members);
    } else {
      setFilteredMembers(
        members.filter((member) => member.departmentName === selectedDepartment)
      );
    }
  }, [selectedDepartment, members]);

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    setSelectedDepartment(event.target.value);
  };

  const uniqueDepartments = Array.from(
    new Set(members.map((member) => member.departmentName))
  ).filter((dept) => dept !== undefined && dept !== null);

  if (isLoading) {
    return (
      <div style={{ color: "#ffffff", fontSize: "1.5rem" }}>読み込み中...</div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            size="small"
            sx={{
              color: "#ffffff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.3)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(138, 43, 226, 0.8)",
              },
              "& .MuiSvgIcon-root": {
                color: "#ffffff",
              },
            }}
          >
            <MenuItem value="ALL">全部署</MenuItem>
            {uniqueDepartments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Heading text="ルーレット" />
      </div>
      <CommonButton color="info" onClick={() => setIsModalOpen(true)}>
        詳細設定
      </CommonButton>
      <Roulette members={filteredMembers} />
      <SettingsModal
        members={members}
        setMembers={setMembers}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Footer text="ver1.0.0" />
    </>
  );
}

export default App;
