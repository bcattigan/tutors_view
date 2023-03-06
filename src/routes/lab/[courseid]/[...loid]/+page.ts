import type { PageLoad } from "./$types";
import { courseService } from "../../../../packages/tutors-reader-lib/src/services/course-service";

export const load: PageLoad = async ({ url, params }) => {
  const lab = await courseService.readLab(params.courseid, url.pathname);
  const lastSegment = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
  if (lastSegment.startsWith("book")) {
    lab.setFirstPageActive();
  } else {
    lab.setActivePage(lastSegment);
  }
  return {
    lab: lab,
    lo: lab.lo
  };
};
