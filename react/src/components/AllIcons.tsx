import React, { useState } from "react";
import { IconType, iconNames } from "../types/IconType";
import { Icon } from "./Icon";

export const AllIcons: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);

    const ITEMS_PER_PAGE = 20;

    const filteredIcons = iconNames.filter((icon: IconType) =>
        icon.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedIcons = filteredIcons.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const totalPages = Math.ceil(filteredIcons.length / ITEMS_PER_PAGE);

    return (
        <>
            <input
                type="text"
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
                style={{marginBottom: "10px", padding: "8px", width: "200px"}}
            />
            <pre>
                <code>
                  {`<Icon name="react" size="large" className="none" />`}
                </code>
            </pre>
            <div className="grid">
                {paginatedIcons.map((icon: IconType) => (
                    <div key={icon} className="box">
                        <div>
                            <Icon name={icon} size="small" alt={`${icon} icon`}/>
                            <Icon name={icon} size="medium" alt={`${icon} icon`}/>
                            <Icon name={icon} size="large" alt={`${icon} icon`}/>
                            <p>{icon}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </>
    );
};
