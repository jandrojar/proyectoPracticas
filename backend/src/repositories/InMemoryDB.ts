/**
 * @description This is an in-memory database for demonstration purposes only
 */
export default class InMemoryDB<T extends { id?: string }> {
  // Private storage for the in-memory database
  #storage: Map<string, T> = new Map();

  /**
   * Creates a new document and adds it to the in-memory database.
   *
   * @param document - The document object to be created
   * @returns The newly created document with its unique ID assigned by the in-memory database.
   */
   create(document: T): T {
    if (!document.id) {
      document.id = crypto.randomUUID();
    }
    this.#storage.set(document.id, document);
    return document;
  }

  /**
   * Finds a document in the in-memory database based on its unique identifier.
   *
   * @param id - The unique identifier of the document to find.
   * @returns The found document or `undefined` if not found.
   */
  findById(id: string): T | undefined {
    return this.#storage.get(id);
  }

  /**
   * Retrieves all documents from the in-memory database.
   *
   * @returns An array containing all documents stored in the in-memory database.
   */
  findAll(): T[] {
    return Array.from(this.#storage.values());
  }

/**
 * Updates a document in the in-memory database.
 *
 * @param id - The unique identifier of the document to update.
 * @param partialDocument - Partial updates to apply to the document.
 * @returns The updated document or `undefined` if not found.
*/
  update(id: string, partialDocument: Partial<T>): T | undefined {
    if (this.#storage.has(id)) {
      const existingDocument = this.#storage.get(id)!; // Non-null assertion because we checked with has()
      const updatedDocument = { ...existingDocument, ...partialDocument, id }; // Ensure the id remains unchanged
      this.#storage.set(id, updatedDocument);
      return updatedDocument;
    }
    return undefined;
  }
  /**
   * Deletes a document from the in-memory database.
   *
   * @param id - The unique identifier of the document to delete.
   * @returns A boolean indicating whether the deletion was successful (`true`) or not (`false`).
   */
  delete(id: string): boolean {
    return this.#storage.delete(id);
  }

    createMany(documents: T[]): T[] {
    return documents.map(doc => this.create(doc));
  }
}