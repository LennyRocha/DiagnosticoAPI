package mx.edu.utez.diagnostico.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    @Transactional(readOnly = true)
    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Cliente findById(Long id) {
        return clienteRepository.findById(id).orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }

    @Transactional
    public Cliente save(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @Transactional
    public String delete(Long id) {
        clienteRepository.deleteById(id);
        return "Cliente eliminado";
    }

    @Transactional
    public Cliente update(Cliente cliente, Long id) {
        Cliente old = findById(id);
        old.setNombre(cliente.getNombre());
        old.setApellidos(cliente.getApellidos());
        old.setCurp(cliente.getCurp());
        old.setFechaNacimiento(cliente.getFechaNacimiento());
        return clienteRepository.save(old);
    }
}
