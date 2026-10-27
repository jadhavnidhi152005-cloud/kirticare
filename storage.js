/* 
===================================================================
 CampusCare - Local Data Storage Engine & Role-Based Access Control
 Separates Student Access (Register & Track) from College Access (Solve & Resolve)
===================================================================
*/

// Pre-configured default sample users
const DEFAULT_USERS = [
    {
        name: "Campus Administrator",
        email: "admin@college.edu",
        roll_number: "ADMIN001",
        department: "Facility & Maintenance Office",
        password: "admin123",
        role: "admin" // College Staff Authority
    },
    {
        name: "Rahul Sharma",
        email: "rahul@college.edu",
        roll_number: "CS202401",
        department: "Computer Science",
        password: "student123",
        role: "student"
    },
    {
        name: "Priya Patel",
        email: "priya@college.edu",
        roll_number: "EC202415",
        department: "Electronics & Comm.",
        password: "student123",
        role: "student"
    },
    {
        name: "Aman Verma",
        email: "aman@college.edu",
        roll_number: "ME202432",
        department: "Mechanical Engineering",
        password: "student123",
        role: "student"
    }
];

// Helper: Realistic Visual Evidence SVGs for offline demonstration
function getDefaultSampleImage(category) {
    category = (category || '').toLowerCase();
    if (category.includes('water')) {
        return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='380' viewBox='0 0 600 380'><rect width='600' height='380' fill='%230f172a'/><rect x='200' y='60' width='200' height='260' rx='16' fill='%23334155' stroke='%2364748b' stroke-width='4'/><rect x='225' y='90' width='150' height='80' rx='8' fill='%231e293b'/><circle cx='250' cy='130' r='12' fill='%23ef4444'/><text x='270' y='135' font-family='Arial' font-size='13' font-weight='bold' fill='%23fca5a5'>FILTER RED</text><rect x='270' y='200' width='60' height='25' rx='4' fill='%230284c7'/><path d='M295 225 C295 260 305 260 305 290' stroke='%2338bdf8' stroke-width='6' stroke-dasharray='6,4' fill='none'/><text x='300' y='360' font-family='Arial' font-size='15' font-weight='bold' fill='%2394a3b8' text-anchor='middle'>Evidence: Water Cooler Filter Alert %26 Leakage</text></svg>";
    } else if (category.includes('wifi') || category.includes('wi-fi')) {
        return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='380' viewBox='0 0 600 380'><rect width='600' height='380' fill='%230f172a'/><rect x='160' y='120' width='280' height='120' rx='14' fill='%231e293b' stroke='%23475569' stroke-width='4'/><line x1='210' y1='120' x2='170' y2='45' stroke='%2394a3b8' stroke-width='6' stroke-linecap='round'/><line x1='390' y1='120' x2='430' y2='45' stroke='%2394a3b8' stroke-width='6' stroke-linecap='round'/><circle cx='220' cy='180' r='9' fill='%2322c55e'/><circle cx='260' cy='180' r='9' fill='%23ef4444'/><circle cx='300' cy='180' r='9' fill='%23f59e0b'/><text x='250' y='215' font-family='Arial' font-size='12' font-weight='bold' fill='%23f87171'>DISCONNECTED</text><text x='300' y='320' font-family='Arial' font-size='15' font-weight='bold' fill='%2394a3b8' text-anchor='middle'>Evidence: AP Router Amber Light Error</text></svg>";
    } else if (category.includes('washroom')) {
        return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='380' viewBox='0 0 600 380'><rect width='600' height='380' fill='%230f172a'/><rect x='150' y='220' width='300' height='80' rx='12' fill='%23e2e8f0'/><path d='M270 120 C270 80 330 80 330 120 L330 160 L270 160 Z' fill='%2394a3b8'/><rect x='285' y='160' width='30' height='30' rx='4' fill='%2364748b'/><circle cx='300' cy='220' r='8' fill='%2338bdf8'/><circle cx='300' cy='250' r='12' fill='%2338bdf8'/><path d='M220 270 Q300 290 380 270' stroke='%230284c7' stroke-width='8' fill='none'/><text x='300' y='345' font-family='Arial' font-size='15' font-weight='bold' fill='%2394a3b8' text-anchor='middle'>Evidence: Washroom Basin Tap Leaking Continuously</text></svg>";
    } else if (category.includes('electr')) {
        return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='380' viewBox='0 0 600 380'><rect width='600' height='380' fill='%230f172a'/><rect x='210' y='70' width='180' height='220' rx='12' fill='%23f8fafc' stroke='%23cbd5e1' stroke-width='5'/><rect x='240' y='110' width='35' height='55' rx='4' fill='%23334155'/><rect x='325' y='110' width='35' height='55' rx='4' fill='%23334155'/><circle cx='300' cy='220' r='26' fill='%23e2e8f0'/><path d='M290 130 L315 110 L305 138 L325 138 L295 175 L302 148 Z' fill='%23eab308' stroke='%23dc2626' stroke-width='2'/><text x='300' y='345' font-family='Arial' font-size='15' font-weight='bold' fill='%23f87171' text-anchor='middle'>Evidence: Switchboard Sparking %26 Regulator Fault</text></svg>";
    } else {
        return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='380' viewBox='0 0 600 380'><rect width='600' height='380' fill='%230f172a'/><rect x='170' y='80' width='260' height='170' rx='10' fill='%230284c7' stroke='%2338bdf8' stroke-width='4'/><text x='300' y='170' font-family='Arial' font-size='22' font-weight='bold' fill='%23ffffff' text-anchor='middle'>NO HDMI SIGNAL</text><line x1='300' y1='250' x2='300' y2='290' stroke='%23ef4444' stroke-width='6' stroke-dasharray='5,5'/><text x='300' y='345' font-family='Arial' font-size='15' font-weight='bold' fill='%2394a3b8' text-anchor='middle'>Evidence: Projector Display Cable Disconnected</text></svg>";
    }
}

// Pre-configured default sample complaints
const DEFAULT_COMPLAINTS = [
    {
        id: 1,
        ticket_id: "CMP-1001",
        category: "Wi-Fi",
        location: "Library 2nd Floor Reading Room",
        priority: "High",
        description: "Wi-Fi signal keeps dropping every 5 minutes, unable to access research portal.",
        image_data: getDefaultSampleImage("Wi-Fi"),
        student_name: "Rahul Sharma",
        roll_number: "CS202401",
        department: "Computer Science",
        status: "In Progress",
        admin_remark: "IT team dispatched a technician to inspect the access point on floor 2.",
        created_at: "2026-10-18",
        updated_at: "2026-10-18 11:30"
    },
    {
        id: 2,
        ticket_id: "CMP-1002",
        category: "Water",
        location: "Main Academic Block, 1st Floor Near Room 104",
        priority: "High",
        description: "Water cooler is not chilling and the filter indicator light is red.",
        image_data: getDefaultSampleImage("Water"),
        student_name: "Priya Patel",
        roll_number: "EC202415",
        department: "Electronics & Comm.",
        status: "Pending",
        admin_remark: "",
        created_at: "2026-10-18",
        updated_at: "2026-10-18 09:15"
    },
    {
        id: 3,
        ticket_id: "CMP-1003",
        category: "Electricity",
        location: "Science Block, Physics Lab 3",
        priority: "Medium",
        description: "Two ceiling fans are not working and switch board is sparking slightly.",
        image_data: getDefaultSampleImage("Electricity"),
        student_name: "Rahul Sharma",
        roll_number: "CS202401",
        department: "Computer Science",
        status: "Resolved",
        admin_remark: "Electrician replaced faulty switch board and repaired fan regulator.",
        student_rating: 5,
        student_feedback: "Electrician arrived on the same day and replaced the sparking switchboard. Working perfectly now!",
        created_at: "2026-10-17",
        updated_at: "2026-10-18 14:15"
    },
    {
        id: 4,
        ticket_id: "CMP-1004",
        category: "Washroom",
        location: "Hostel Block C, Ground Floor Washroom",
        priority: "Medium",
        description: "Tap is leaking continuously causing water wastage.",
        image_data: getDefaultSampleImage("Washroom"),
        student_name: "Aman Verma",
        roll_number: "ME202432",
        department: "Mechanical Engineering",
        status: "Pending",
        admin_remark: "",
        created_at: "2026-10-18",
        updated_at: "2026-10-18 10:00"
    },
    {
        id: 5,
        ticket_id: "CMP-1005",
        category: "Classroom",
        location: "Lecture Hall 201",
        priority: "Low",
        description: "Projector HDMI port is loose and display flickers during lectures.",
        image_data: getDefaultSampleImage("Classroom"),
        student_name: "Rahul Sharma",
        roll_number: "CS202401",
        department: "Computer Science",
        status: "In Progress",
        admin_remark: "AV maintenance vendor scheduled to replace the HDMI cable socket.",
        created_at: "2026-10-18",
        updated_at: "2026-10-18 16:00"
    }
];

// =======================================================
// User Authentication & Role Separation
// =======================================================

function getUsers() {
    const data = localStorage.getItem('campuscare_users');
    if (!data) {
        localStorage.setItem('campuscare_users', JSON.stringify(DEFAULT_USERS));
        return DEFAULT_USERS;
    }
    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_USERS;
    } catch(e) {
        return DEFAULT_USERS;
    }
}

function saveUsers(users) {
    localStorage.setItem('campuscare_users', JSON.stringify(users));
}

function getCurrentUser() {
    const data = localStorage.getItem('campuscare_current_user');
    if (!data) return null;
    try {
        return JSON.parse(data);
    } catch(e) {
        return null;
    }
}

function setCurrentUser(user) {
    localStorage.setItem('campuscare_current_user', JSON.stringify(user));
}

function logoutUser() {
    localStorage.removeItem('campuscare_current_user');
}

function isAdminLoggedIn() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

function isStudentLoggedIn() {
    const user = getCurrentUser();
    return user && user.role === 'student';
}

function registerUser(userData) {
    const users = getUsers();
    const emailClean = (userData.email || '').trim().toLowerCase();
    const rollClean = (userData.roll_number || '').trim().toUpperCase();

    // Check if user already exists
    const exists = users.find(u => 
        (u.email && u.email.toLowerCase() === emailClean) ||
        (u.roll_number && u.roll_number.toUpperCase() === rollClean)
    );

    if (exists) {
        return { success: false, message: "An account with this Email or Roll Number already exists!" };
    }

    const newUser = {
        name: userData.name.trim(),
        email: emailClean,
        roll_number: rollClean,
        department: userData.department || "General",
        password: userData.password,
        role: "student" // Students registered from website are always student role
    };

    users.push(newUser);
    saveUsers(users);

    // Automatically log in as the newly registered student
    setCurrentUser(newUser);
    return { success: true, user: newUser };
}

function loginUser(identifier, password, requiredRole = null) {
    const users = getUsers();
    const idClean = identifier.trim().toLowerCase();

    const user = users.find(u => 
        (u.email.toLowerCase() === idClean || (u.roll_number && u.roll_number.toLowerCase() === idClean)) &&
        u.password === password
    );

    if (user) {
        if (requiredRole && user.role !== requiredRole) {
            if (requiredRole === 'admin') {
                return { success: false, message: "Access Restricted: This login is only for College Staff / Administrators to resolve complaints. Please use the Student Portal." };
            } else {
                return { success: false, message: "This login is for Students to register grievances. College staff should use the College Authority Portal." };
            }
        }
        setCurrentUser(user);
        return { success: true, user: user };
    }
    return { success: false, message: "Invalid Email/Roll Number or Password. Please try again." };
}

// =======================================================
// Complaints Data Management
// =======================================================

function getComplaints() {
    const data = localStorage.getItem('campuscare_complaints');
    if (!data) {
        localStorage.setItem('campuscare_complaints', JSON.stringify(DEFAULT_COMPLAINTS));
        return DEFAULT_COMPLAINTS;
    }
    try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
            // Ensure default complaints have image_data if missing in existing localStorage
            let updated = false;
            parsed.forEach(c => {
                if (!c.image_data && c.category && c.id <= 5) {
                    c.image_data = getDefaultSampleImage(c.category);
                    updated = true;
                }
            });
            if (updated) localStorage.setItem('campuscare_complaints', JSON.stringify(parsed));
            return parsed;
        }
        localStorage.setItem('campuscare_complaints', JSON.stringify(DEFAULT_COMPLAINTS));
        return DEFAULT_COMPLAINTS;
    } catch(e) {
        return DEFAULT_COMPLAINTS;
    }
}

function saveComplaints(complaints) {
    localStorage.setItem('campuscare_complaints', JSON.stringify(complaints));
}

function addComplaint(complaint) {
    const list = getComplaints();
    const maxNum = list.reduce((max, c) => {
        const match = (c.ticket_id || '').match(/\d+/);
        const num = match ? parseInt(match[0], 10) : 0;
        return num > max ? num : max;
    }, 1005);

    const nextTicketNum = maxNum + 1;
    const nextTicketId = 'CMP-' + nextTicketNum;

    // Check who is logged in right now
    const currentUser = getCurrentUser();

    let studentName = "Guest Student";
    let rollNumber = "N/A";
    let department = "General";

    if (currentUser && currentUser.role !== 'admin') {
        studentName = currentUser.name;
        rollNumber = currentUser.roll_number;
        department = currentUser.department;
    } else if (complaint.student_name && complaint.student_name !== 'Rahul Sharma') {
        studentName = complaint.student_name;
        rollNumber = complaint.roll_number || "N/A";
        department = complaint.department || "General";
    } else if (currentUser && currentUser.role === 'admin') {
        studentName = currentUser.name + " (Staff)";
        rollNumber = currentUser.roll_number;
        department = currentUser.department;
    }

    const newEntry = {
        id: list.length + 1,
        ticket_id: nextTicketId,
        category: complaint.category,
        priority: complaint.priority,
        location: complaint.location,
        description: complaint.description,
        image_data: complaint.image_data || '',
        student_name: studentName,
        roll_number: rollNumber,
        department: department,
        status: 'Pending',
        admin_remark: '',
        created_at: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    list.unshift(newEntry);
    saveComplaints(list);
    return newEntry;
}

// Only College Authorities / Staff can update complaint status
function updateComplaintStatus(ticketId, newStatus, newRemark) {
    const list = getComplaints();
    const item = list.find(c => c.ticket_id.toUpperCase() === ticketId.trim().toUpperCase());
    if (item) {
        item.status = newStatus;
        if (newRemark !== undefined && newRemark !== null) {
            item.admin_remark = newRemark;
        }
        item.updated_at = new Date().toISOString().replace('T', ' ').substring(0, 16);
        saveComplaints(list);
        return true;
    }
    return false;
}

function getComplaintByTicket(ticketId) {
    if (!ticketId) return null;
    const list = getComplaints();
    return list.find(c => c.ticket_id.toUpperCase() === ticketId.trim().toUpperCase());
}

// Retrieve complaints strictly belonging to a specific student (Privacy Protection)
function getStudentComplaints(student) {
    if (!student) return [];
    const list = getComplaints();
    if (student.role === 'admin') return list; // College Staff can view all complaints
    
    const roll = (student.roll_number || '').trim().toUpperCase();
    const name = (student.name || '').trim().toLowerCase();

    return list.filter(c => {
        const cRoll = (c.roll_number || '').trim().toUpperCase();
        const cName = (c.student_name || '').trim().toLowerCase();
        return (roll && cRoll === roll) || (name && cName === name);
    });
}

// Verify if a specific complaint belongs to the active student
function isComplaintOwner(complaint, student) {
    if (!complaint) return false;
    if (!student) return false;
    if (student.role === 'admin') return true; // College staff have authority to inspect and solve

    const roll = (student.roll_number || '').trim().toUpperCase();
    const name = (student.name || '').trim().toLowerCase();
    const cRoll = (complaint.roll_number || '').trim().toUpperCase();
    const cName = (complaint.student_name || '').trim().toLowerCase();

    return (roll && cRoll === roll) || (name && cName === name);
}
