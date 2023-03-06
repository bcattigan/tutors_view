import type { PageLoad } from "./$types";
import { courseService } from "../../../packages/tutors-reader-lib/src/services/course-service";
import type { Course } from "../../../packages/tutors-reader-lib/src/models/course";
import { currentLo } from "../../../packages/tutors-reader-lib/src/stores/stores";

export const load: PageLoad = async ({ params }) => {
  const course: Course = await courseService.readCourse(params.courseid);
  currentLo.set(course.lo);
  return {
    course: course,
    lo: course.lo
  };
};
