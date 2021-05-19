import { Specification } from "../../entities/Specification";
import {
	ISpecificationsRepository,
	ICreateSpecificationDTO,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
	private specifications: Specification[];

	private static INSTANCE = new SpecificationsRepository();

	private constructor() {
		this.specifications = [];
	}

	public static getInstance(): SpecificationsRepository {
		if (!SpecificationsRepository.INSTANCE) {
			SpecificationsRepository.INSTANCE = new SpecificationsRepository();
		}
		return SpecificationsRepository.INSTANCE;
	}

	create({ name, description }: ICreateSpecificationDTO): void {
		const specification = new Specification();
		Object.assign(specification, {
			name,
			description,
			created_at: new Date(),
		});
		this.specifications.push(specification);
	}

	list(): Specification[] {
		return this.specifications;
	}

	findByName(name: string): Specification {
		const specification = this.specifications.find(
			(specificationElement) => specificationElement.name === name
		);
		return specification;
	}
}

export { SpecificationsRepository };
