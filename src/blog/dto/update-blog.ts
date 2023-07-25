import { PartialType } from "@nestjs/swagger";
import { CreateBlog } from "./create-blog";

export class UpdateBlogDto extends PartialType(CreateBlog) {}