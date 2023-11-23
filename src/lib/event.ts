import { ClubCategory } from "@prisma/client";

export function getCategoryInThai(category: ClubCategory) {
	switch (category) {
		case ClubCategory.UnitOFCurriculumAndSpecialPrograms:
			return "หน่วยกิจกรรมเสริมหลักสูตร และกิจการพิเศษ";
		case ClubCategory.UnitOfActivitiesForCharityAndAcademic:
			return "หน่วยกิจกรรมด้านบำเพ็ญประโยชน์และวิชาการ";
		case ClubCategory.UnitOfActivitiesSupport:
			return "หน่วยกิจกรรมสโมสรนิสิต";
		case ClubCategory.UnitOfCulturalAndSportsActivities:
			return "หน่วยกิจกรรมด้านศิลปวัฒนธรรมและกีฬา";
		case ClubCategory.UnitOfStudentOrganization:
			return "หน่วยส่งเสริมกิจกรรมองค์การนิสิต";
	}
}
