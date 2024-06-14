import { CreateCourseController } from '@/http/course/controllers/createController';
import { DeleteCourseByIdController } from '@/http/course/controllers/deleteCourseByIdController';
import { GetCourseByIdController } from '@/http/course/controllers/getCourseByIdController';
import { UpdateCourseByIdController } from '@/http/course/controllers/updateCourseByIdController';

import { PrismaCourseRepository } from '@/repositories/prismaRepository/prismaCourseRepository';
import { CourseRepository } from '@/repositories/courseRepository';
import { CreateCourseService } from '@/services/course/createCourse';
import { DeleteCourseByIdService } from '@/services/course/deleteCoursebyIdService';
import { GetCourseByIdService } from '@/services/course/getCourseById';
import { UpdateCourseByIdService } from '@/services/course/updateCourseByIdService';
import { container } from 'tsyringe';

//Repositories
container.register<CourseRepository>('CoursesRepository', {
  useClass: PrismaCourseRepository,
});

//Services
container.register<CreateCourseService>('CreateCourseService', {
  useClass: CreateCourseService,
});

container.register<GetCourseByIdService>('GetCourseByIdService', {
  useClass: GetCourseByIdService,
});

container.register<UpdateCourseByIdController>('UpdateCourseByIdController', {
  useClass: UpdateCourseByIdController,
});

container.register<DeleteCourseByIdService>('DeleteCourseByIdService', {
  useClass: DeleteCourseByIdService,
});

//Controllers
container.register<CreateCourseController>('CreateCourseController', {
  useClass: CreateCourseController,
});

container.register<GetCourseByIdController>('GetCourseByIdController', {
  useClass: GetCourseByIdController,
});

container.register<UpdateCourseByIdService>('UpdateCourseByIdService', {
  useClass: UpdateCourseByIdService,
});

container.register<DeleteCourseByIdController>('DeleteCourseByIdController', {
  useClass: DeleteCourseByIdController,
});

// Resolve
const createCourseController = container.resolve<CreateCourseController>(
  'CreateCourseController'
);
const getCourseByIdController = container.resolve<GetCourseByIdController>(
  'GetCourseByIdController'
);

const updateCourseByIdController = container.resolve<UpdateCourseByIdController>(
  'UpdateCourseByIdController'
);
const deleteCourseByIdController = container.resolve<DeleteCourseByIdController>(
  'DeleteCourseByIdController'
);

export {
  createCourseController,
  getCourseByIdController,
  updateCourseByIdController,
  deleteCourseByIdController,
};
