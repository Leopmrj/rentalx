import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import {
	ICategoryRepository,
	ICreateCategoryDTO,
} from "../../repositories/ICategoriesRepository";

@injectable()
class ImportCategoryUseCase {
	constructor(
		@inject("CategoriesRepository")
		private categoryRepository: ICategoryRepository
	) {}

	loadCategories(file: Express.Multer.File): Promise<ICreateCategoryDTO[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path);
			const categories: ICreateCategoryDTO[] = [];

			const parseFile = csvParse();

			stream.pipe(parseFile);
			parseFile
				.on("data", async (line) => {
					// ["name", "description"]
					const [name, description] = line;
					categories.push({
						name,
						description,
					});
				})
				.on("end", () => {
					fs.promises.unlink(file.path);
					resolve(categories);
				})
				.on("error", (err) => {
					reject(err);
				});
		});
	}

	async execute(file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategories(file);

		categories.map(async (categoryElement) => {
			const { name, description } = categoryElement;
			const categoryAlreadyExists = await this.categoryRepository.findByName(
				name
			);
			if (!categoryAlreadyExists) {
				await this.categoryRepository.create({
					name,
					description,
				});
			}
		});
	}
}

export { ImportCategoryUseCase };
