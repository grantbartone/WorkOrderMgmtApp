// This is intended to be a library of methods accessible to all components of the application

export const showStatus = (value) => {
    switch (value) {
        case 'OPEN': return 'Open'
        case 'IN_PROGRESS': return 'In Progress'
        default: return 'Unknown'
    }
}