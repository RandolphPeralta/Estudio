// Clase DetalleFactura (representa cada línea de la factura)
public class DetalleFactura
{
    public string Descripcion { get; set; }
    public int Cantidad { get; set; }
    public decimal PrecioUnitario { get; set; }

    public decimal Subtotal()
    {
        return Cantidad * PrecioUnitario;
    }
}

// Clase Factura
public class Factura
{
    private List<DetalleFactura> detalles = new List<DetalleFactura>();

    public void AgregarDetalle(DetalleFactura detalle)
    {
        detalles.Add(detalle);
    }

    public decimal Total()
    {
        decimal total = 0;
        foreach (var detalle in detalles)
        {
            total += detalle.Subtotal();
        }
        return total;
    }
}

// Uso
class Program
{
    static void Main()
    {
        Factura factura = new Factura();
        factura.AgregarDetalle(new DetalleFactura { Descripcion = "Producto A", Cantidad = 2, PrecioUnitario = 10.5m });
        factura.AgregarDetalle(new DetalleFactura { Descripcion = "Producto B", Cantidad = 1, PrecioUnitario = 25.0m });

        Console.WriteLine($"Total factura: {factura.Total()}");
    }
}
