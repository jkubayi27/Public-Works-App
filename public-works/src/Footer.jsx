function Footer() {
    const year = new Date().getFullYear();
    return (
        <div className="footer">
            <h3>Akan Solutions &copy; {year}</h3>
        </div>
    )
}

export default Footer;