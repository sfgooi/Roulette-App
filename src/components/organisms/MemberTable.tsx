import { useEffect, useState, useCallback } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import DepartmentTabs from "../molecules/DepartmentTabs";
import { Member } from "../../api/dynamoDB/types";
import CloseButton from "../atoms/CloseButton";
import { DepartmentType } from "../../types/department";
import {
  saveMembers,
  getAllMembers,
} from "../../api/dynamoDB/operations/member";

type Props = {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  onClose: (isClose: boolean) => void;
};

const MemberTable: React.FC<Props> = ({ onClose, members, setMembers }) => {
  const [originalMembers, setOriginalMembers] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<GridRowSelectionModel>(
    []
  );
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const fetchMembers = useCallback(async () => {
    const members = await getAllMembers();

    setMembers(members);
    setOriginalMembers(members);
    setDepartments(
      members.map((member: Member) => ({
        departmentId: member.departmentId,
        departmentName: member.departmentName,
      }))
    );
  }, []);

  useEffect(() => {
    fetchMembers();
    setMembers(members);
    setOriginalMembers(members);
    setDepartments(
      members.map((member) => ({
        departmentId: member.departmentId,
        departmentName: member.departmentName,
      }))
    );
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      type: "number",
      headerName: "id",
      headerAlign: "left",
      align: "left",
      width: 100,
    },
    {
      field: "memberName",
      type: "string",
      headerName: "名前",
      headerAlign: "left",
      align: "left",
      editable: true,
      width: 250,
    },
    {
      field: "size",
      type: "number",
      headerName: "サイズ",
      headerAlign: "left",
      align: "left",
      flex: 1,
      editable: true,
      width: 250,
    },
  ];

  const checkForChanges = useCallback(
    (currentMembers: Member[]) => {
      if (currentMembers.length !== originalMembers.length) {
        setHasChanges(true);
        return;
      }

      const hasAnyChange = currentMembers.some((currentMember) => {
        const originalMember = originalMembers.find(
          (orig) => orig.memberId === currentMember.memberId
        );
        return (
          !originalMember ||
          originalMember.memberName !== currentMember.memberName ||
          originalMember.size !== currentMember.size
        );
      });

      setHasChanges(hasAnyChange);
    },
    [originalMembers]
  );

  const handleAddUser = () => {
    const newId = Math.max(...members.map((member) => member.memberId)) + 1;
    const newMembers = [
      ...members,
      {
        memberId: newId,
        memberName: "新規ユーザー",
        size: 1,
        departmentId: 1,
        departmentName: "TODO：部署",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    setMembers(newMembers);
    checkForChanges(newMembers);
  };

  const handleDeleteUsers = () => {
    const deletedMembersRows = members.filter(
      (member) => !selectedMembers.includes(member.memberId)
    );

    if (deletedMembersRows.length === 0) {
      alert(
        "メンバーを全て削除することはできません。\n最低1人のメンバーが必要です。"
      );
      return;
    }

    setMembers(deletedMembersRows);
    setSelectedMembers([]);
    checkForChanges(deletedMembersRows);
  };

  const handleUpdateMembers = (newRow: GridRowModel) => {
    const updatedMembers = members.map((member) =>
      member.memberId === newRow.id
        ? {
            ...member,
            memberName: newRow.memberName,
            size: newRow.size,
          }
        : member
    );
    setMembers(updatedMembers);
    checkForChanges(updatedMembers);
    return newRow;
  };

  const handleSave = async (
    updateMembers: Member[],
    originalMembers: Member[]
  ) => {
    try {
      await saveMembers(updateMembers, originalMembers);
      fetchMembers();
      setOriginalMembers(members);
      setHasChanges(false);
    } catch (error) {
      alert("保存中にエラーが発生しました。やり直してください。" + error);
    }
  };

  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 2, justifyContent: "space-between" }}
      >
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleAddUser}>
            メンバーを追加
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteUsers}
            disabled={selectedMembers.length === 0}
          >
            選択したメンバーを削除
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSave(members, originalMembers)}
            disabled={!hasChanges}
          >
            保存
          </Button>
        </Stack>
        <CloseButton onClose={onClose} fetchMembers={fetchMembers} />
      </Stack>
      <DepartmentTabs initialDepartments={departments} />
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={members.map((member) => {
            return {
              id: member.memberId,
              memberName: member.memberName,
              size: member.size,
            };
          })}
          columns={columns}
          processRowUpdate={handleUpdateMembers}
          checkboxSelection
          disableColumnMenu
          hideFooterSelectedRowCount
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection) => {
            setSelectedMembers(newSelection);
          }}
          rowSelectionModel={selectedMembers}
        />
      </div>
    </div>
  );
};

export default MemberTable;
