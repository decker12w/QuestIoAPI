import { PrismaCourseRepository } from '@/repositories/prismaRepository/prismaCourseRepository';
import { CourseRepository } from '@/repositories/courseRepository';
import { CreateCourseService } from '@/services/course/createCourse';
import { DeleteCourseByIdService } from '@/services/course/deleteCoursebyIdService';
import { GetCourseByIdService } from '@/services/course/getCourseById';
import { UpdateCourseByIdService } from '@/services/course/updateCourseByIdService';
import { container } from 'tsyringe';
import { CreateCourseController } from '@/http/controllers/course/createController';
import { DeleteCourseByIdController } from '@/http/controllers/course/deleteCourseByIdController';
import { GetCourseByIdController } from '@/http/controllers/course/getCourseByIdController';
import { UpdateCourseByIdController } from '@/http/controllers/course/updateCourseByIdController';

//Repositories
container.register<CourseRepository>('CourseRepository', {
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
