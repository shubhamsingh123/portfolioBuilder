export interface SubSectionDTO {
  id?: number;
  title: string;
  content: string;
  displayOrder: number;
}

export interface SectionDTO {
  id?: number;
  title: string;
  content: string;
  profileId: number;
  orderIndex: number;
  type: string;
  subSections: SubSectionDTO[];
}
