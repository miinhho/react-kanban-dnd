import type { Column, ColumnId } from "../types";

export const initialData: Column[] = [
  {
    id: "todo",
    title: "할 일",
    tasks: [
      {
        id: "1",
        title: "프로젝트 계획",
        description: "초기 프로젝트 구조 생성",
      },
      {
        id: "2",
        title: "UI 디자인",
        description: "와이어프레임 및 목업 제작",
      },
    ],
  },
  {
    id: "inProgress",
    title: "진행 중",
    tasks: [
      {
        id: "3",
        title: "기능 구현",
        description: "주요 기능 코딩 시작",
      },
    ],
  },
  {
    id: "done",
    title: "완료",
    tasks: [
      {
        id: "4",
        title: "프로젝트 설정",
        description: "React 및 의존성 초기화",
      },
    ],
  },
];

export const ItemType = "TASK";

export const initialColumn: ColumnId = "todo";
