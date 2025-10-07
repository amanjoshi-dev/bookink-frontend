// components/taxonomies/TaxonomyTable.js
'use client';
/**
 * Simple table:
 *  - shows id, name, slug, (image preview if provided)
 *  - edit button (loads row into the form)
 *  - delete button (soft), delete forever button
 */
export default function TaxonomyTable({ items, onEdit, onDelete, onDeletePermanent, hasImage }) {
    return (
        <div
            className="table-responsive bg-dark border rounded"
            style={{
                maxHeight: '65vh',      // keeps table height reasonable
                overflowY: 'auto',       // allows vertical scroll inside
                overflowX: 'auto',       // allows horizontal scroll if needed
            }}
        >
            <table className="table table-dark table-hover align-middle mb-0">
                <thead>
                    <tr>
                        <th style={{ width: 80 }}>ID</th>
                        <th>Name</th>
                        <th>Slug</th>
                        {hasImage && <th style={{ width: 120 }}>Image</th>}
                        <th style={{ width: 160 }}></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(row => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td className="text-secondary">{row.slug}</td>
                            {hasImage && (
                                <td>
                                    {row.image_url ? (
                                        <img src={row.image_url} alt={row.name} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 6 }} />
                                    ) : (
                                        <span className="text-secondary small">No image</span>
                                    )}
                                </td>
                            )}
                            <td className="text-end">
                                <button className="btn btn-outline-light btn-sm me-2" onClick={() => onEdit(row)}>
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button className="btn btn-outline-warning btn-sm me-2" onClick={() => onDelete(row)}>
                                    <i className="bi bi-archive"></i>
                                </button>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => onDeletePermanent(row)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    {items.length === 0 && (
                        <tr>
                            <td colSpan={hasImage ? 5 : 4} className="text-center text-secondary py-4">
                                No items.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
